const DASHBOARD = require('../classes/DashboardClass');

module.exports =
{ 
    async viewDashboard(req, res)
    {
            let dashboard = new DASHBOARD();
            let resp = await dashboard.view_dashboard();
            res.send(resp);
       },
}