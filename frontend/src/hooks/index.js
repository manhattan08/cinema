import {useContext} from "react";
import {ThemeContext} from "../context/ThemeProvider";
import {NotificationContext} from "../context/NotificationProvider";
import {AuthContext} from "../context/AuthProvider";
import {SearchContext} from "../context/SearchProvider";
import {MovieContext} from "../context/MoviesProvider";

export const useTheme = () => useContext(ThemeContext)
export const useNotification = () => useContext(NotificationContext)
export const useAuth = () => useContext(AuthContext)
export const useSearch = () => useContext(SearchContext)
export const useMovies = () => useContext(MovieContext)
