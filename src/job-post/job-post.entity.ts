import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ScheduleType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  PER_DIEM = 'PER_DIEM',
}

/**
 * Represents a job post listing in the system.
 * Maps to the `job_posts` table in PostgreSQL.
 */
@Entity('job_posts')
export class JobPost {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  jobTitle: string;

  @Column()
  specialty: string;

  @Column()
  location: string;

  @Column({ type: 'enum', enum: ScheduleType, nullable: true })
  scheduleType: ScheduleType | null;

  @Column({ type: 'varchar', nullable: true })
  compensation: string | null;

  @Column({ type: 'date', nullable: true })
  startDate: Date | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
