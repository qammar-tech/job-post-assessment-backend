import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobPost } from '../job-post/job-post.entity';

export enum ApplicationStatus {
  APPLIED = 'APPLIED',
  SHORTLISTED = 'SHORTLISTED',
  REJECTED = 'REJECTED',
}

/**
 * Represents a physician's application to a job post.
 * Maps to the `applications` table in PostgreSQL.
 */
@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column()
  specialty: string;

  @Column()
  currentLocation: string;

  @Column({ type: 'date' })
  availabilityDate: Date;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.APPLIED,
  })
  status: ApplicationStatus;

  @ManyToOne(() => JobPost, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'job_post_id' })
  jobPost: JobPost;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
