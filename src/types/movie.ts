export interface VideoResult {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
}

export interface CastMember {
  cast_id: number;
  id: number;
  name: string;
  profile_path?: string;
  character: string;
}

export interface CrewMember {
  credit_id: string;
  department: string;
  job: string;
  name: string;
  profile_path: string | null;
}

export interface ReviewResult {
  id: string;
  author: string;
  content: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: VideoResult[];
  };
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  reviews: {
    page: number;
    total_pages: number;
    total_results: number;
    results: ReviewResult[];
  };
}
