export interface NewSound {
  title: string,
  icon: string,
  categoryID: string,
  src: string,
}

export interface Sound extends NewSound {
  id: string;
}

export type AudioStatus = 'playing' | 'paused' | 'waiting' | 'ended';
