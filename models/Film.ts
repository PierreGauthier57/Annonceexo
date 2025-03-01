export interface Film {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export async function getFilms(): Promise<Array<Film>> {
  try {
    const res: Film[] = [];

    const fichier1 = require('../data/PopularMovies_p1.json');
    const fichier2 = require('../data/PopularMovies_p2.json');

    const response = [...(fichier1.results), ...(fichier2.results)] 

    response.map((value: any) => {
      res.push(
        {
          id: value.id,
          title: value.title,
          release_date: value.release_date,
          vote_average: value.vote_average,
          overview: value.overview,
          poster_path: value.poster_path,
        }
      )
    });
    return res;
  } catch (error: any) {
    console.log(`Error with function getFilm ${error.message}`);
    throw error;
  }
};