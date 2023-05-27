export interface NotificationInterface {
    id: number,
    watched: boolean,
    title: string,
    type: string,
    description: string;
}

export interface StateInterface {
    notifications: { [id: number]: NotificationInterface; },
    files: any[],
    cameras: any[];
}