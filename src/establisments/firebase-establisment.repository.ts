import type { Establisment } from "../interfaces/establisment.interface";
import type { IEstablishmentRepository } from "../interfaces/repositories/establisment-repository.interface";
import type { Firestore } from "firebase-admin/firestore";

export class FirebaseEstablismentRepository
  implements
    IEstablishmentRepository<{
      limit?: number;
      startAt?: number;
    }>
{
  constructor(private firestore: Firestore) {}

  getAll = async ({
    limit = 10,
    startAt = 0,
  }: {
    limit?: number;
    startAt?: number;
  }): Promise<Establisment[]> => {
    const establishmentsREf = this.firestore.collection("establisments");
    const documents = await establishmentsREf
      .orderBy('country')
      .startAt(startAt)
      .limit(limit)
      .get();
    const establishments: Establisment[] = [];
    documents.forEach((doc) => {
      establishments.push({ id: doc.id, ...doc.data() } as Establisment);
    });

    return establishments;
  };
  add = async (establisment: Establisment): Promise<void> => {
    try {
      const docRef = this.firestore.collection("establisments").doc();
      await docRef.create(establisment);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };
}
