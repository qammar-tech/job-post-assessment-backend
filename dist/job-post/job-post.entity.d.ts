export declare enum ScheduleType {
    FULL_TIME = "FULL_TIME",
    PART_TIME = "PART_TIME",
    CONTRACT = "CONTRACT",
    PER_DIEM = "PER_DIEM"
}
export declare class JobPost {
    readonly id: string;
    jobTitle: string;
    specialty: string;
    location: string;
    scheduleType: ScheduleType | null;
    compensation: string | null;
    startDate: Date | null;
    description: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
