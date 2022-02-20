export interface RespuestaMDB {
    page: number;
    results: Pelicula[];
    total_pages: number;
    total_results: number;
  }
  
  export interface Pelicula {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  export interface PeliculaDetalle {
    adult?: boolean;
    backdrop_path?: string;
    belongs_to_collection?: any;
    budget?: number;
    genres?: Genre[];
    homepage?: string;
    id?: number;
    imdb_id?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: Productioncompany[];
    production_countries?: Productioncountry[];
    release_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_languages?: Spokenlanguage[];
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
  }
  
  interface Spokenlanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
  }
  
  interface Productioncountry {
    iso_3166_1: string;
    name: string;
  }
  
  interface Productioncompany {
    id: number;
    logo_path?: string;
    name: string;
    origin_country: string;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }

  export interface RespuestaCredits {
    id: number;
    cast: Cast[];
    crew: Crew[];
  }
  
  export interface Crew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string;
    credit_id: string;
    department: string;
    job: string;
  }
  
  export interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path?: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }


  export interface responseVideos {
    id: number;
    results: Video[];
  }
  
  export interface Video {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }
  

  export interface PersonDetail {
    birthday: string;
    known_for_department: string;
    deathday?: any;
    id: number;
    name: string;
    also_known_as: string[];
    gender: number;
    biography: string;
    popularity: number;
    place_of_birth: string;
    profile_path: string;
    adult: boolean;
    imdb_id: string;
    homepage?: any;
    images: PersonImages;
    movie_credits: MovieCredits;
    status_code?: number;
  }

  export interface PersonImages {
    profiles: Profile[];
  }
  
  export interface Profile {
    aspect_ratio: number;
    height: number;
    iso_639_1?: any;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }

  export interface MovieCredits {
    cast: PeopleDetailCast[];
  }
  
  export interface PeopleDetailCast {
    adult: boolean;
    backdrop_path?: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path?: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    popularity: number;
    character: string;
    credit_id: string;
    order: number;
  }