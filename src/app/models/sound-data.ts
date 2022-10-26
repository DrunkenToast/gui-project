export interface NewSound {
  title: string,
  icon: string,
  categoryID: string,
}

export interface Sound extends NewSound {
  id: string;
  src: string,
}

export type AudioStatus = 'playing' | 'paused' | 'waiting' | 'ended';
