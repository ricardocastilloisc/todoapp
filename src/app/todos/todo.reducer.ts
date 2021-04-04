import { Action, createReducer,on } from "@ngrx/store";
import { Todo } from "./models/todo.model";
import { crear } from './todo.actions';

export const estadoInicial:Todo[] = [
  new Todo('Salvar al mundo')
];

const _todoReducer =  createReducer(estadoInicial,
  on(crear, (state, {texto}) => [...state, new Todo( texto) ] ),
);

export const todoReducer = (state: Todo[] | undefined, action: Action) =>
{
  return _todoReducer(state, action);
}
