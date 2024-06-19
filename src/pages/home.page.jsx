// packages
import react from "react";
import lodash from "lodash";

// components
import NavbarComponent from "../components/navbar.component";
import ItemComponent from "../components/item/item.card.component";
import LoadingComponent from "../components/loading.component";
import ItemListComponent from "../components/item/item.list.component";

// modals
import ItemCreateModal from "../components/item/item.create.modal";
import ItemUpdateModal from "../components/item/item.update.modal";
import ItemDeleteModal from "../components/item/item.delete.modal";
import AuthLogoutModal from "../components/auth/auth.logout.modal";
import AuthLoginModal from "../components/auth/auth.login.modal";
import AuthRegisterModal from "../components/auth/auth.register.modal";
import SettingsModal from "../components/settings.modal";

// context
import { SettingsProvider } from "../context/settings.context";
import { ItemsProvider } from "../context/items.context";
import { AuthProvider } from "../context/auth.context";
import { ThemeProvider } from "../context/theme.context";

export default function HomePage() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <AuthProvider>
          <ItemsProvider>
            <NavbarComponent />
            <ItemCreateModal />
            <AuthLoginModal />
            <AuthRegisterModal />
            <AuthLogoutModal />
            <SettingsModal />
            <ItemListComponent />
          </ItemsProvider>
        </AuthProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}
