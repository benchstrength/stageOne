import { ISkill } from './skill.model';

export interface IUser {
    email: string,
    firstName: string,
    lastName: string,
    isEmployee: boolean,
    isActive: boolean,
    img_url: string,
    startTOD: string,
    endTOD: string,
    Skills: ISkill[]
}
