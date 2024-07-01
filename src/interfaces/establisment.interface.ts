import type { ClassificationEnum } from "../enums/classification.enum";

export interface Establisment {
    id?: string;
    name: string;
    country: string;
    classification: ClassificationEnum;
    parent?: string;
}