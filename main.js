const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection
pool.getConnection()
  .then(conn => {
    console.log('MySQL connected');
    conn.release();
  })
  .catch(err => console.error('MySQL connection error:', err));

// Get dashboard data
app.get('/api/dashboard', async (req, res) => {
  try {
    // Fetch overview
    const [overviewRows] = await pool.query('SELECT * FROM overview LIMIT 1');
    if (!overviewRows.length) {
      return res.status(404).json({ message: 'No overview data found' });
    }
    const overview = overviewRows[0];

    // Fetch branch comparison
    const [branchCompRows] = await pool.query('SELECT * FROM branch_comparison WHERE overview_id = ?', [overview.id]);
    const branchComparison = {
      branch1: branchCompRows.find(row => row.branch_name === 'branch1') || {},
      branch2: branchCompRows.find(row => row.branch_name === 'branch2') || {},
    };

    // Fetch branch1 data
    const [branch1Rows] = await pool.query('SELECT * FROM branch_data WHERE branch_name = "branch1" LIMIT 1');
    const branch1Data = branch1Rows[0] || {};
    const [branch1Trends] = await pool.query('SELECT * FROM branch_monthly_trends WHERE branch_data_id = ? ORDER BY FIELD(month_name, "Jan", "Feb", "Mar", "Apr", "May", "Jun")', [branch1Data.id]);
    branch1Data.salesTrends = branch1Trends.map(row => row.sales_trend);
    branch1Data.profitMargin = branch1Trends.map(row => row.profit_margin);
    branch1Data.stockTurnover = branch1Trends.map(row => row.stock_turnover);
    branch1Data.procurement = branch1Trends.map(row => row.procurement);

    // Fetch branch2 data
    const [branch2Rows] = await pool.query('SELECT * FROM branch_data WHERE branch_name = "branch2" LIMIT 1');
    const branch2Data = branch2Rows[0] || {};
    const [branch2Trends] = await pool.query('SELECT * FROM branch_monthly_trends WHERE branch_data_id = ? ORDER BY FIELD(month_name, "Jan", "Feb", "Mar", "Apr", "May", "Jun")', [branch2Data.id]);
    branch2Data.salesTrends = branch2Trends.map(row => row.sales_trend);
    branch2Data.profitMargin = branch2Trends.map(row => row.profit_margin);
    branch2Data.stockTurnover = branch2Trends.map(row => row.stock_turnover);
    branch2Data.procurement = branch2Trends.map(row => row.procurement);

    // Structure response to match frontend expectations
    const dashboardData = {
      overview: {
        combinedEvents: overview.combined_events,
        totalSales: overview.total_sales,
        profitMargin: overview.profit_margin,
        stockTurnover: overview.stock_turnover,
        procurement: overview.procurement,
        branchComparison: {
          branch1: {
            sales: branchComparison.branch1.sales,
            profitMargin: branchComparison.branch1.profit_margin,
            stockTurnover: branchComparison.branch1.stock_turnover,
          },
          branch2: {
            sales: branchComparison.branch2.sales,
            profitMargin: branchComparison.branch2.profit_margin,
            stockTurnover: branchComparison.branch2.stock_turnover,
          },
        },
      },
      branch1: {
        events: branch1Data.events,
        salesTrends: branch1Data.salesTrends,
        profitMargin: branch1Data.profitMargin,
        stockTurnover: branch1Data.stockTurnover,
        procurement: branch1Data.procurement,
        creditSales: branch1Data.credit_sales,
        dealerPerformance: branch1Data.dealer_performance,
        salesAgentPerformance: branch1Data.sales_agent_performance,
        buyersAnalysis: {
          buyerId: branch1Data.buyer_id,
          amount: branch1Data.buyer_amount,
        },
        invoices: branch1Data.invoices,
      },
      branch2: {
        events: branch2Data.events,
        salesTrends: branch2Data.salesTrends,
        profitMargin: branch2Data.profitMargin,
        stockTurnover: branch2Data.stockTurnover,
        procurement: branch2Data.procurement,
        creditSales: branch2Data.credit_sales,
        dealerPerformance: branch2Data.dealer_performance,
        salesAgentPerformance: branch2Data.sales_agent_performance,
        buyersAnalysis: {
          buyerId: branch2Data.buyer_id,
          amount: branch2Data.buyer_amount,
        },
        invoices: branch2Data.invoices,
      },
    };

    res.json(dashboardData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add or update dashboard data
app.post('/api/dashboard', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const { overview, branch1, branch2 } = req.body;

    // Update or insert overview
    const [overviewRows] = await connection.query('SELECT id FROM overview LIMIT 1');
    if (overviewRows.length) {
      await connection.query(
        'UPDATE overview SET combined_events = ?, total_sales = ?, profit_margin = ?, stock_turnover = ?, procurement = ? WHERE id = ?',
        [
          overview.combinedEvents,
          overview.totalSales,
          overview.profitMargin,
          overview.stockTurnover,
          overview.procurement,
          overviewRows[0].id,
        ]
      );
    } else {
      await connection.query(
        'INSERT INTO overview (combined_events, total_sales, profit_margin, stock_turnover, procurement) VALUES (?, ?, ?, ?, ?)',
        [
          overview.combinedEvents,
          overview.totalSales,
          overview.profitMargin,
          overview.stockTurnover,
          overview.procurement,
        ]
      );
    }

    // Get overview ID
    const [newOverview] = await connection.query('SELECT id FROM overview LIMIT 1');
    const overviewId = newOverview[0].id;

    // Update or insert branch comparison
    for (const branch of ['branch1', 'branch2']) {
      const branchData = overview.branchComparison[branch];
      const [existing] = await connection.query(
        'SELECT id FROM branch_comparison WHERE overview_id = ? AND branch_name = ?',
        [overviewId, branch]
      );
      if (existing.length) {
        await connection.query(
          'UPDATE branch_comparison SET sales = ?, profit_margin = ?, stock_turnover = ? WHERE id = ?',
          [branchData.sales, branchData.profitMargin, branchData.stockTurnover, existing[0].id]
        );
      } else {
        await connection.query(
          'INSERT INTO branch_comparison (overview_id, branch_name, sales, profit_margin, stock_turnover) VALUES (?, ?, ?, ?, ?)',
          [overviewId, branch, branchData.sales, branchData.profitMargin, branchData.stockTurnover]
        );
      }
    }

    // Update or insert branch data
    for (const branch of [{ name: 'branch1', data: branch1 }, { name: 'branch2', data: branch2 }]) {
      const [branchRows] = await connection.query(
        'SELECT id FROM branch_data WHERE branch_name = ? LIMIT 1',
        [branch.name]
      );
      let branchId;
      if (branchRows.length) {
        branchId = branchRows[0].id;
        await connection.query(
          'UPDATE branch_data SET events = ?, credit_sales = ?, dealer_performance = ?, sales_agent_performance = ?, invoices = ?, buyer_id = ?, buyer_amount = ? WHERE id = ?',
          [
            branch.data.events,
            branch.data.creditSales,
            branch.data.dealerPerformance,
            branch.data.salesAgentPerformance,
            branch.data.invoices,
            branch.data.buyersAnalysis.buyerId,
            branch.data.buyersAnalysis.amount,
            branchId,
          ]
        );
      } else {
        await connection.query(
          'INSERT INTO branch_data (branch_name, events, credit_sales, dealer_performance, sales_agent_performance, invoices, buyer_id, buyer_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [
            branch.name,
            branch.data.events,
            branch.data.creditSales,
            branch.data.dealerPerformance,
            branch.data.salesAgentPerformance,
            branch.data.invoices,
            branch.data.buyersAnalysis.buyerId,
            branch.data.buyersAnalysis.amount,
          ]
        );
        const [newBranch] = await connection.query('SELECT id FROM branch_data WHERE branch_name = ? LIMIT 1', [branch.name]);
        branchId = newBranch[0].id;
      }

      // Update monthly trends
      await connection.query('DELETE FROM branch_monthly_trends WHERE branch_data_id = ?', [branchId]);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      for (let i = 0; i < months.length; i++) {
        await connection.query(
          'INSERT INTO branch_monthly_trends (branch_data_id, month_name, sales_trend, profit_margin, stock_turnover, procurement) VALUES (?, ?, ?, ?, ?, ?)',
          [
            branchId,
            months[i],
            branch.data.salesTrends[i],
            branch.data.profitMargin[i],
            branch.data.stockTurnover[i],
            branch.data.procurement[i],
          ]
        );
      }
    }

    await connection.commit();
    res.status(201).json({ message: 'Dashboard data updated' });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  } finally {
    connection.release();
  }
});

// Add manager
app.post('/api/managers', async (req, res) => {
  try {
    const { name, email, branch } = req.body;
    const [result] = await pool.query(
      'INSERT INTO managers (name, email, branch) VALUES (?, ?, ?)',
      [name, email, branch]
    );
    res.status(201).json({ id: result.insertId, name, email, branch });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get managers (optional, for future use)
app.get('/api/managers', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM managers');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});