import {
    NEW_PROJECT_COMPLETED,
    NEW_PROJECT_SAVING,
    NEW_PROJECT_SAVED,
    NEW_PROJECT_ERROR
} from './types';
import { PROJECTS_URL } from '../lib/constants';
import axios from 'axios';

const MODAL_DISMISSED_TIMEOUT = 1500;

export const newProjectSaving = () => ({
    type: NEW_PROJECT_SAVING
});

export const newProjectSaved = () => ({
    type: NEW_PROJECT_SAVED
});

export const newProjectError = () => ({
    type: NEW_PROJECT_ERROR
});

export const newProjectCompleted = () => ({
    type: NEW_PROJECT_COMPLETED
});

export const createNewProject = (project, scene) => (dispatch) => {
    dispatch(newProjectSaving());

    axios
        .post(PROJECTS_URL, { project, scene })
        .then(() => {
            dispatch(newProjectSaved());
            setTimeout(() => {
                dispatch(newProjectCompleted());
            }, MODAL_DISMISSED_TIMEOUT);
        })
        .catch(() => {
            dispatch(newProjectError());
        });
}