import { DatabaseProvider } from "../util/database";
import { provide } from "inversify-binding-decorators";
import { TYPES } from "../constant/types";
import { Movie } from "../model/movie";


@provide(TYPES.MovieService)
export class MovieService {

  public async create(movie: Movie): Promise<Movie> {
    const newMovie = new Movie();
    // newMovie.firstName = Movie.firstName;
    // newMovie.lastName = Movie.lastName;
    // newMovie.age = Movie.age;

    newMovie.name = movie.name;

    const connection = await DatabaseProvider.getConnection();
    return await connection.getRepository(Movie).save(newMovie);
  }

  public async list(): Promise<Movie[]> {
    const connection  =  await DatabaseProvider.getConnection();
    return await connection.getRepository(Movie).find();
  }


  public async getById(id: number): Promise<Movie> {
    const connection  =  await DatabaseProvider.getConnection();
    return await connection.getRepository(Movie).findOne(id);
  }


  public async update(movie: Movie): Promise<Movie> {
    const connection = await DatabaseProvider.getConnection();
    const repository = connection.getRepository(Movie);
    const entity = await repository.findOne(movie.id);
    entity.name = movie.name;
    return await repository.save(entity);
  }

  public async delete(id: number): Promise<Movie> {
    const connection = await DatabaseProvider.getConnection();
    const repository = connection.getRepository(Movie);
    const entity = await repository.findOne(id);
    return await connection.getRepository(Movie).remove(entity);
  }
}
