import { Action, createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { CategoryModel } from "@models/configurations/category.model";
import * as actions from "../actions/category.actions";

/** Se declara la interface del reducer */
export interface State extends EntityState<CategoryModel> {
  selectCurrentId: string | number | null;
  loading: boolean;
}
/** El adapter es como el puente entre el estore y el reducer */
export const adapter: EntityAdapter<CategoryModel> =
  createEntityAdapter<CategoryModel>();

/** Inicializamos el state */
export const initialState: State = adapter.getInitialState({
  selectCurrentId: null,
  loading: false,
});

/** Definimos todos los escucha por cada accion para efectuar un reducer conectado al store a traves del adapter */
const entityReducer = createReducer(
  initialState,
  on(actions.searchApiCategorys, (state) => ({ ...state, loading: true })),
  on(actions.loadCategorys, (state, { items }) => {
    return adapter.setAll(items, { ...state, loading: false });
  }),
  on(actions.searchOneApiCategory, (state) => ({
    ...state,
    loading: true,
  })),
  on(actions.setCategory, (state, { item }) => {
    return adapter.setOne(item, { ...state, loading: false });
  }),

  on(actions.createApiCategory, (state) => ({ ...state, loading: true })),
  on(actions.addCategory, (state, { item }) => {
    return adapter.addOne(item, { ...state, loading: false });
  }),
  on(actions.addCategorys, (state, { items }) => {
    return adapter.addMany(items, { ...state, loading: false });
  }),

  on(actions.updateApiCategory, (state) => ({ ...state, loading: true })),
  on(actions.updateCategory, (state, { item }) => {
    return adapter.updateOne(item, { ...state, loading: false });
  }),
  on(actions.updateCategorys, (state, { items }) => {
    return adapter.updateMany(items, { ...state, loading: false });
  }),
  on(actions.upsertCategory, (state, { item }) => {
    return adapter.upsertOne(item, { ...state, loading: false });
  }),
  on(actions.upsertCategorys, (state, { items }) => {
    return adapter.upsertMany(items, { ...state, loading: false });
  }),

  on(actions.deleteApiCategory, (state) => ({ ...state, loading: true })),
  on(actions.deleteCategory, (state, { id }) => {
    return adapter.removeOne(id, { ...state, loading: false });
  }),
  on(actions.deleteCategorys, (state, { ids }) => {
    return adapter.removeMany(ids, { ...state, loading: false });
  }),
  on(actions.clearCategorys, (state) => {
    return adapter.removeAll({
      ...state,
      selectCurrentId: null,
    });
  }),
  on(actions.setCurrentCategoryId, (state, { id }) => {
    return { ...state, selectCurrentId: id };
  }),
  on(actions.clearCurrentCategory, (state) => {
    return { ...state, selectCurrentId: null };
  }),
  on(actions.resetLoading, (state) => {
    return { ...state, loading: false };
  })
);

/** Se exporta la funcion reducer que contiene todo el store */
export function reducer(state: State | undefined, action: Action) {
  // console.log("STATE==>>",state)
  return entityReducer(state, action);
}

/** Se definen todas las variables que queremos manejar en el store respecto a la entidad */
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
/** Esta variable contiene el identificador de un item actual */
export const selectCurrentId = (state: State) => state.selectCurrentId;
