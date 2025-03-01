export interface Annonce {
  id: string;
  model: string;
  constructor: string;
  os: string;
  releaseDate: number;
  salerAvatar: string;
  saler: string;
  description: string;
  salerGender: string;
  salerCity: string;
  salerCountry: string;
  phone: string;
  price: number;
}

export async function getAnnonces(): Promise<Array<Annonce>> {
  try {
    const res: Annonce[] = [];

    const fichier1 = require('../data/phone.json');

    const response = [...(fichier1)] 

    response.map((value: any) => {
      res.push(
        {
          id: value.id,
          model: value.model,
          constructor: value.constructor,
          os: value.os,
          releaseDate: value.releaseDate,
          salerAvatar: value.salerAvatar,
          saler: value.saler,
          description: value.description,
          salerGender: value.salerGender,
          salerCity: value.salerCity,
          salerCountry: value.salerCountry,
          phone: value.phone,
          price: value.price,
        }
      )
    });
    return res;
  } catch (error: any) {
    console.log(`Error with function getAnnonce ${error.message}`);
    throw error;
  }
};