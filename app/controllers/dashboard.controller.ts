

export default class DashboardController {
    style = 'dashboard';

    getDashboard = (req, res, next) => {
        const variables: any = {};
        if (!req.user) {
            res.redirect('/user');
            return;
        }

        res.render('../views/pages/dashboard/index.pug', { style: this.style, ...variables });
        return;
    };
}