/**
 * Should be moved to /models and stored in the DB in a real app
 */

import Mars from 'entities/Mars';
import { UUID } from 'types';

const marsStore: Record<UUID, Mars> = {};

export const registerMarsInstance = (instance: Mars) => {
  marsStore[instance.id] = instance;
};

export const getMarsInstance = (id: UUID) => marsStore[id];
