import type { IEstablishmentRepository } from "../../interfaces/repositories/establisment-repository.interface";
import type { Establisment } from "../../interfaces/establisment.interface";
import type { IUseCase } from "../../interfaces/use-case";

export class GetEstablishmentsUseCase
  implements
    IUseCase<Promise<Establisment[]>, { limit?: number; startAt?: number }>
{
  constructor(
    private establishmentRepository: IEstablishmentRepository<{
      limit?: number;
      startAt?: number;
    }>
  ) {}

  execute = async ({
    limit = 10,
    startAt = 0,
  }: {
    limit?: number;
    startAt?: number;
  }): Promise<Establisment[]> => {
    return await this.establishmentRepository.getAll({ limit, startAt });
  };
}
