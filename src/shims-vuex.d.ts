import { Store } from "vuex";

declare module "@vue/runtime-core" {
  // You have to declare your new values also here :))))))
  interface State {
    PlayerData: playerInfo[];
    connection: string;
    selectedIndex: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
