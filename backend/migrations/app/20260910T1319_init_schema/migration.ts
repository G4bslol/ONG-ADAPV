#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/1e8412e162dbbe69f4bb3bf8d07f0280ae67eaab15c34dcf201e67468315428d/contract';
import startContract from '../../snapshots/1e8412e162dbbe69f4bb3bf8d07f0280ae67eaab15c34dcf201e67468315428d/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/759902108c432369ad3835bb88f2406622d79f4e51e71efa0f4cc12ad26a3e72/contract';
import endContract from '../../snapshots/759902108c432369ad3835bb88f2406622d79f4e51e71efa0f4cc12ad26a3e72/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'post' }),
      this.dropTable({ schema: 'public', table: 'user' }),
      this.createTable({
        schema: 'public',
        table: 'adopters',
        columns: [
          col('address', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('cpf', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('hasOtherPets', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('housingType', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('occupation', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('otherPetsInfo', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'adoption_documents',
        columns: [
          col('adoptionProcessId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fileUrl', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('signedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'adoption_documents_type_check_0ca6472c',
            "\"type\" IN ('ADOPTION_TERM', 'SIGNATURE_PROOF', 'DELIVERY_RECEIPT', 'OTHER')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'adoption_processes',
        columns: [
          col('adopterId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('animalId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('approvalDate', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('compatibilityNotes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('deliveryDate', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('requestDate', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('status', 'text', {
            notNull: true,
            default: lit('PRE_EVALUATION'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'adoption_processes_status_check_a3e79080',
            "\"status\" IN ('PRE_EVALUATION', 'APPROVED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'animals',
        columns: [
          col('approximateAge', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('arrivedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('breed', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('healthHistory', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('leftAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('neuterStatus', 'text', {
            notNull: true,
            default: lit('NOT_NEUTERED'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('physicalTraits', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('rescueConditions', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('rescueDate', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('sex', 'text', {
            notNull: true,
            default: lit('UNKNOWN'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('species', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('RESCUED'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'animals_neuterStatus_check_5d2c685b',
            "\"neuterStatus\" IN ('NOT_NEUTERED', 'SCHEDULED', 'NEUTERED')",
          ),
          checkExpression('animals_sex_check_35ee12d4', "\"sex\" IN ('MALE', 'FEMALE', 'UNKNOWN')"),
          checkExpression(
            'animals_species_check_bc68df6f',
            "\"species\" IN ('DOG', 'CAT', 'OTHER')",
          ),
          checkExpression(
            'animals_status_check_4d83131b',
            "\"status\" IN ('RESCUED', 'IN_TREATMENT', 'QUARANTINE', 'AVAILABLE_FOR_ADOPTION', 'ADOPTED', 'DECEASED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'attachments',
        columns: [
          col('animalId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('uploadedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('url', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'attachments_type_check_883f763b',
            "\"type\" IN ('PHOTO', 'VET_REPORT', 'OTHER')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'donations',
        columns: [
          col('date', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('donorContact', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('donorName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('quantity', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('unit', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('value', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'donations_type_check_d8327d70',
            "\"type\" IN ('MONEY', 'FOOD', 'MEDICINE', 'HYGIENE', 'MATERIAL', 'OTHER')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'inventory_items',
        columns: [
          col('category', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('minThreshold', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('quantity', 'float8', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/float8@1' },
          }),
          col('unit', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'inventory_items_category_check_2d8e1bca',
            "\"category\" IN ('FOOD', 'MEDICINE', 'HYGIENE', 'MATERIAL', 'OTHER')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'medical_records',
        columns: [
          col('animalId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('clinic', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('date', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('veterinarian', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'medical_records_type_check_36d7dc0a',
            "\"type\" IN ('CONSULTATION', 'TREATMENT', 'MEDICATION', 'EXAM')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'notifications',
        columns: [
          col('adoptionProcessId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('animalId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('message', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('read', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('scheduledFor', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'notifications_type_check_ee3ebcf7',
            "\"type\" IN ('NEW_RESCUE', 'VACCINE_REMINDER', 'VET_FOLLOWUP', 'MEDICATION_REMINDER', 'CRITICAL_ANIMAL', 'ADOPTION_UPDATE', 'DONATION_CAMPAIGN')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'resource_usages',
        columns: [
          col('animalId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('date', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('inventoryItemId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('quantityUsed', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'surgeries',
        columns: [
          col('animalId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('clinic', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('performedDate', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('scheduledDate', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('status', 'text', {
            notNull: true,
            default: lit('SCHEDULED'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('veterinarian', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'surgeries_status_check_78cb05f7',
            "\"status\" IN ('SCHEDULED', 'COMPLETED', 'CANCELED')",
          ),
          checkExpression(
            'surgeries_type_check_e687e185',
            "\"type\" IN ('CASTRATION', 'RECONSTRUCTIVE', 'EMERGENCY', 'OTHER')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'users',
        columns: [
          col('active', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('passwordHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', {
            notNull: true,
            default: lit('STAFF'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'users_role_check_9882e4e8',
            "\"role\" IN ('ADMIN', 'STAFF', 'VET', 'VOLUNTEER')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'vaccinations',
        columns: [
          col('animalId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('applicationDate', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('nextDoseDate', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('vaccineName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('veterinarian', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'volunteers',
        columns: [
          col('availability', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('email', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('joinedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'volunteers_status_check_ee520df2',
            "\"status\" IN ('ACTIVE', 'INACTIVE')",
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'adopters',
        constraint: 'adopters_cpf_key',
        columns: ['cpf'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_email_key',
        columns: ['email'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'volunteers',
        constraint: 'volunteers_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'adoption_documents',
        index: 'adoption_documents_adoptionProcessId_idx_25903e92',
        columns: ['adoptionProcessId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'adoption_processes',
        index: 'adoption_processes_adopterId_idx_f6ab36c2',
        columns: ['adopterId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'adoption_processes',
        index: 'adoption_processes_animalId_idx_ffe1386b',
        columns: ['animalId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'adoption_processes',
        index: 'adoption_processes_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'animals',
        index: 'animals_neuterStatus_idx_7bfaa38f',
        columns: ['neuterStatus'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'animals',
        index: 'animals_rescueDate_idx_4b8de02b',
        columns: ['rescueDate'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'animals',
        index: 'animals_status_idx_e98638ab',
        columns: ['status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'attachments',
        index: 'attachments_animalId_idx_ffe1386b',
        columns: ['animalId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'donations',
        index: 'donations_date_idx_b4ca319c',
        columns: ['date'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'donations',
        index: 'donations_type_idx_b6b604ea',
        columns: ['type'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'medical_records',
        index: 'medical_records_animalId_idx_ffe1386b',
        columns: ['animalId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'medical_records',
        index: 'medical_records_date_idx_b4ca319c',
        columns: ['date'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'notifications',
        index: 'notifications_adoptionProcessId_idx_25903e92',
        columns: ['adoptionProcessId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'notifications',
        index: 'notifications_animalId_idx_ffe1386b',
        columns: ['animalId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'notifications',
        index: 'notifications_read_idx_38171f9c',
        columns: ['read'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'notifications',
        index: 'notifications_type_idx_b6b604ea',
        columns: ['type'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'resource_usages',
        index: 'resource_usages_animalId_idx_ffe1386b',
        columns: ['animalId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'resource_usages',
        index: 'resource_usages_inventoryItemId_idx_ddbb7ccf',
        columns: ['inventoryItemId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'surgeries',
        index: 'surgeries_animalId_idx_ffe1386b',
        columns: ['animalId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'surgeries',
        index: 'surgeries_type_status_idx_f045f361',
        columns: ['type', 'status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'vaccinations',
        index: 'vaccinations_animalId_idx_ffe1386b',
        columns: ['animalId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'vaccinations',
        index: 'vaccinations_nextDoseDate_idx_64695c8b',
        columns: ['nextDoseDate'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'adoption_documents',
        foreignKey: {
          name: 'adoption_documents_adoptionProcessId_fkey',
          columns: ['adoptionProcessId'],
          references: { schema: 'public', table: 'adoption_processes', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'adoption_processes',
        foreignKey: {
          name: 'adoption_processes_animalId_fkey',
          columns: ['animalId'],
          references: { schema: 'public', table: 'animals', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'adoption_processes',
        foreignKey: {
          name: 'adoption_processes_adopterId_fkey',
          columns: ['adopterId'],
          references: { schema: 'public', table: 'adopters', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'attachments',
        foreignKey: {
          name: 'attachments_animalId_fkey',
          columns: ['animalId'],
          references: { schema: 'public', table: 'animals', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'medical_records',
        foreignKey: {
          name: 'medical_records_animalId_fkey',
          columns: ['animalId'],
          references: { schema: 'public', table: 'animals', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'notifications',
        foreignKey: {
          name: 'notifications_animalId_fkey',
          columns: ['animalId'],
          references: { schema: 'public', table: 'animals', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'notifications',
        foreignKey: {
          name: 'notifications_adoptionProcessId_fkey',
          columns: ['adoptionProcessId'],
          references: { schema: 'public', table: 'adoption_processes', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'resource_usages',
        foreignKey: {
          name: 'resource_usages_animalId_fkey',
          columns: ['animalId'],
          references: { schema: 'public', table: 'animals', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'resource_usages',
        foreignKey: {
          name: 'resource_usages_inventoryItemId_fkey',
          columns: ['inventoryItemId'],
          references: { schema: 'public', table: 'inventory_items', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'surgeries',
        foreignKey: {
          name: 'surgeries_animalId_fkey',
          columns: ['animalId'],
          references: { schema: 'public', table: 'animals', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'vaccinations',
        foreignKey: {
          name: 'vaccinations_animalId_fkey',
          columns: ['animalId'],
          references: { schema: 'public', table: 'animals', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
