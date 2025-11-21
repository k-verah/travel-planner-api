import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Country {
  // Código alpha-3 — clave primaria
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column()
  region: string;

  @Column()
  subregion: string;

  @Column()
  capital: string;

  @Column()
  population: number;

  @Column()
  flagUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
