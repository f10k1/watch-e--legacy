export default class ChartController {
    style = 'dashboard';

    getNotificationByHour = (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(
            [
                { hour: 12, count: 10 },
                { hour: 13, count: 20 },
                { hour: 14, count: 15 },
                { hour: 16, count: 25 },
                { hour: 17, count: 22 },
                { hour: 18, count: 30 },
                { hour: 19, count: 28 },
            ]
        ));
    };
}