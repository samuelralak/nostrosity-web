import {Data, ObjectResponse} from "@/resources/user";

export const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')
export const transformer = (response: ObjectResponse | Data) => <unknown>('data' in response ? response.data : response).attributes
