export interface NotificationInterface {
    id: number,
    watched: boolean,
    title: string,
    type: string,
    description: string,
    important: boolean,
    create_date: Date;
}

export interface SystemNotificationInterface {
    type: string,
    description: string;
}

export interface SystemInterface {
    config: any,
    notificationQueue: SystemNotificationInterface[];
}

export interface StateInterface {
    notifications: { [id: number]: NotificationInterface; },
    files: any[],
    cameras: any[];
    system: SystemInterface;
}

export enum NOTIFICATIONS_TYPES {
    ALL,
    STARRED,
    UNWATCHED,
}