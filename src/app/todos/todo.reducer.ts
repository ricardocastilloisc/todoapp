import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear, toggle, editar, borrar, toggleAll, limpiarTodos } from './todo.actions';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer'),
  new Todo('Mundo'),
];

const _todoReducer = createReducer(
  estadoInicial,

  on(limpiarTodos, (state) => state.filter((e) => !e.completado)),

  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
  }),
  on(borrar, (state, { id }) => state.filter((e) => e.id !== id)),

  on(editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        };
      } else {
        return todo;
      }
    });
  }),
  on(toggleAll, (state, { completado }) => {
    return state.map((todo) => {
      return {
        ...todo,
        completado: completado,
      };
    });
  })
);

export const todoReducer = (state: Todo[] | undefined, action: Action) => {
  return _todoReducer(state, action);
};
