

export default class DashboardController {
    style = 'dashboard';

    getDashboard = (req, res, next) => {
        const variables: any = {};
        res.render('../views/pages/dashboard/index.pug', { style: this.style, ...variables });
        return;
    };
}