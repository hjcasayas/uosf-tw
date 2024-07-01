import type { Establisment } from "../../interfaces/establisment.interface";
import type { IEstablishmentRepository } from "../../interfaces/repositories/establisment-repository.interface";
import type { IUseCase } from "../../interfaces/use-case";

export class AddEstablishmentUseCase
  implements IUseCase<Promise<void>, Establisment>
{
  constructor(private establishmentRepository: IEstablishmentRepository<{}>) {}
  execute = async (params: Establisment): Promise<void> => {
    try {
      await this.establishmentRepository.add(params);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };
}
