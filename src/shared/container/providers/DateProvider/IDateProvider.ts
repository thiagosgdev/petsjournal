

export interface IDateProvider {
    addDays(days:number): Date;
    compareInDays(start_date: Date, end_date: Date): number;    
    convertToUTC(date: Date): string;
}