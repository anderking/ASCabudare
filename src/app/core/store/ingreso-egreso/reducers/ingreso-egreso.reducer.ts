import { Action, createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { IngresoEgresoModel } from "@models/ingreso-egreso/ingreso-egreso.model";
import * as actions from "../actions/ingreso-egreso.actions";

/** Se declara la interface del reducer */
export interface State extends EntityState<IngresoEgresoModel> {
  selectCurrentId: string | number | null;
  loading: boolean;
}
/** El adapter es como el puente entre el estore y el reducer */
export const adapter: EntityAdapter<IngresoEgresoModel> =
  createEntityAdapter<IngresoEgresoModel>();

/** Inicializamos el state */
export const initialState: State = adapter.getInitialState({
  selectCurrentId: null,
  loading: false,
});

/** Definimos todos los escucha por cada accion para efectuar un reducer conectado al store a traves del adapter */
const entityReducer = createReducer(
  initialState,
  on(actions.searchApiIngresoEgresos, (state) => ({ ...state, loading: true })),
  on(actions.loadIngresoEgresos, (state, { items }) => {
    return adapter.setAll(items, { ...state, loading: false });
  }),
  on(actions.searchOneApiIngresoEgreso, (state) => ({
    ...state,
    loading: true,
  })),
  on(actions.setIngresoEgreso, (state, { item }) => {
    return adapter.setOne(item, { ...state, loading: false });
  }),

  on(actions.createApiIngresoEgreso, (state) => ({ ...state, loading: true })),
  on(actions.addIngresoEgreso, (state, { item }) => {
    return adapter.addOne(item, { ...state, loading: false });
  }),
  on(actions.addIngresoEgresos, (state, { items }) => {
    return adapter.addMany(items, { ...state, loading: false });
  }),

  on(actions.updateApiIngresoEgreso, (state) => ({ ...state, loading: true })),
  on(actions.updateIngresoEgreso, (state, { item }) => {
    return adapter.updateOne(item, { ...state, loading: false });
  }),
  on(actions.updateIngresoEgresos, (state, { items }) => {
    return adapter.updateMany(items, { ...state, loading: false });
  }),
  on(actions.upsertIngresoEgreso, (state, { item }) => {
    return adapter.upsertOne(item, { ...state, loading: false });
  }),
  on(actions.upsertIngresoEgresos, (state, { items }) => {
    return adapter.upsertMany(items, { ...state, loading: false });
  }),

  on(actions.deleteApiIngresoEgreso, (state) => ({ ...state, loading: true })),
  on(actions.deleteIngresoEgreso, (state, { id }) => {
    return adapter.removeOne(id, { ...state, loading: false });
  }),
  on(actions.deleteIngresoEgresos, (state, { ids }) => {
    return adapter.removeMany(ids, { ...state, loading: false });
  }),
  on(actions.clearIngresoEgresos, (state) => {
    return adapter.removeAll({
      ...state,
      selectCurrentId: null,
    });
  }),
  on(actions.setCurrentIngresoEgresoId, (state, { id }) => {
    return { ...state, selectCurrentId: id };
  }),
  on(actions.clearCurrentIngresoEgreso, (state) => {
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
