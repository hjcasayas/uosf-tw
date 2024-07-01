import { ClassificationEnum } from "../enums/classification.enum";
import type { Establisment } from "../interfaces/establisment.interface";

export function hippolabstoEstablisment(dto: HippolabsDTO): Establisment {
  return {
    name: dto.name,
    country: dto.country,
    classification: getClassification(dto.name),
  };
}

export function getClassification(name: string): ClassificationEnum {
  if (name.toLowerCase().includes(ClassificationEnum.COLLEGE.toLowerCase())) {
    return ClassificationEnum.COLLEGE;
  }

  if (
    name.toLowerCase().includes(ClassificationEnum.UNIVERSITY.toLowerCase())
  ) {
    return ClassificationEnum.UNIVERSITY;
  }

  return ClassificationEnum.UNIVERSITY;
}
