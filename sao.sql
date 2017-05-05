-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-05-2017 a las 23:36:41
-- Versión del servidor: 5.6.25
-- Versión de PHP: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sao`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agencia`
--

CREATE TABLE IF NOT EXISTS `agencia` (
  `ID_agencia` int(11) NOT NULL,
  `Nombre_agencia` varchar(150) NOT NULL,
  `Descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `agencia`
--

INSERT INTO `agencia` (`ID_agencia`, `Nombre_agencia`, `Descripcion`) VALUES
(2, 'La agencia de cccc', 'Es arrechisima esta otra'),
(3, 'sad', 'asdasd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `arribo`
--

CREATE TABLE IF NOT EXISTS `arribo` (
  `ID_arribo` int(11) NOT NULL,
  `ID_buque` int(11) NOT NULL,
  `Fecha_arribo` date NOT NULL,
  `ID_puerto` int(11) NOT NULL,
  `ID_agencia` int(11) NOT NULL,
  `Observaciones` varchar(500) DEFAULT NULL,
  `Calado_proa` int(11) NOT NULL,
  `Calado_popa` int(11) NOT NULL,
  `Diferencias_calado` int(11) NOT NULL,
  `Estado` tinyint(4) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `arribo`
--

INSERT INTO `arribo` (`ID_arribo`, `ID_buque`, `Fecha_arribo`, `ID_puerto`, `ID_agencia`, `Observaciones`, `Calado_proa`, `Calado_popa`, `Diferencias_calado`, `Estado`) VALUES
(3, 2, '2017-11-21', 2, 2, 'chisimo', 1, 2, 432, 0),
(4, 2, '2017-03-08', 2, 2, '1212', 2435, 5234, 5234, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buque`
--

CREATE TABLE IF NOT EXISTS `buque` (
  `ID_buque` int(11) NOT NULL,
  `Nombre_buque` varchar(100) NOT NULL,
  `Numero_imo` varchar(20) NOT NULL,
  `Abanderamiento` varchar(50) NOT NULL,
  `Eslora` int(11) NOT NULL,
  `Manga` int(11) NOT NULL,
  `Puntal` int(11) NOT NULL,
  `N_tanques_babor` int(11) NOT NULL,
  `N_tanques_estribor` int(11) NOT NULL,
  `N_tanques_db` int(11) NOT NULL,
  `Total_tanques` int(11) NOT NULL,
  `Capacidad_tanques` int(11) NOT NULL,
  `Vol_total` int(11) NOT NULL,
  `Fotos` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `buque`
--

INSERT INTO `buque` (`ID_buque`, `Nombre_buque`, `Numero_imo`, `Abanderamiento`, `Eslora`, `Manga`, `Puntal`, `N_tanques_babor`, `N_tanques_estribor`, `N_tanques_db`, `Total_tanques`, `Capacidad_tanques`, `Vol_total`, `Fotos`) VALUES
(1, 'El buque de leonardo', '1234', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
(2, 'El buque de leonardo', 'ABVSDSD', 'listo', 11, 11, 22, 20, 18, 0, 0, 0, 0, NULL),
(3, 'El buque de leonardo', '1234', 'listo', 11, 11, 22, 20, 18, 38, 38, 1221, 1232, NULL),
(4, 'El buque de leonardo jejeps', '1234', 'listo', 11, 11, 22, 20, 0, 38, 38, 1221, 1232, 'foto.jpg'),
(6, 'El buque de leonardo', '1234', 'listo', 11, 11, 22, 20, 18, 38, 38, 1221, 1232, 'foto.jpg'),
(7, 'El buque de leonardo', '12345', 'listo', 11, 11, 22, 20, 18, 38, 38, 1221, 1232, 'foto.jpg'),
(8, '123', '123', '123', 123, 123, 123, 213, 123, 123, 213, 213, 123, NULL),
(9, '213', '213', '213', 213, 123, 213, 213, 123, 123, 123, 213, 213, NULL),
(10, 'wqe', 'qwe', 'qwe', 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL),
(11, 'ds', '12', '12', 12, 12, 12, 12, 12, 12, 12, 12, 12, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudio`
--

CREATE TABLE IF NOT EXISTS `estudio` (
  `ID_estudio` int(11) NOT NULL,
  `ID_arribo` int(11) NOT NULL,
  `ID_usuario` int(11) NOT NULL,
  `N_tanque` int(11) NOT NULL,
  `Capacidad` int(11) DEFAULT NULL,
  `Volumen` int(11) DEFAULT NULL,
  `Actividad` int(11) NOT NULL,
  `Salinidad` int(11) NOT NULL,
  `Temperatura` int(11) NOT NULL,
  `Conductividad` int(11) NOT NULL,
  `Ph` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estudio`
--

INSERT INTO `estudio` (`ID_estudio`, `ID_arribo`, `ID_usuario`, `N_tanque`, `Capacidad`, `Volumen`, `Actividad`, `Salinidad`, `Temperatura`, `Conductividad`, `Ph`) VALUES
(2, 3, 3, 2, 200, 300, 12, 20, 40, 10, 1234),
(3, 3, 3, 3, 20, 300, 12, 20, 40, 10, 1234);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puerto`
--

CREATE TABLE IF NOT EXISTS `puerto` (
  `ID_puerto` int(11) NOT NULL,
  `Nombre_puerto` varchar(150) NOT NULL,
  `Direccion` varchar(150) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `Ciudad` varchar(100) NOT NULL,
  `Estado` varchar(100) NOT NULL,
  `Latitud` decimal(14,12) NOT NULL,
  `Longitud` decimal(14,12) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `puerto`
--

INSERT INTO `puerto` (`ID_puerto`, `Nombre_puerto`, `Direccion`, `Descripcion`, `Ciudad`, `Estado`, `Latitud`, `Longitud`) VALUES
(2, 'el puerto de leonardo', 'holaaaa', 'Aqui debe ir la descripcion', 'Puerto ordaz', 'Bolivar', '1.230000000000', '0.000000000000'),
(3, 'Palua', 'dcs', '21312', 'San Felix', 'Bolivar', '8.000000000000', '8.000000000000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `ID_usuario` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Privilegio` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID_usuario`, `Username`, `Contrasena`, `Correo`, `Privilegio`) VALUES
(3, 'lnrd2561', '$2a$10$y2zitjAkHpcwAvwJuPqz/.r.KLvrWYcihLfN/rYgdkwVr7h1iyYSW', 'leo1@gmail.com', '2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agencia`
--
ALTER TABLE `agencia`
  ADD PRIMARY KEY (`ID_agencia`);

--
-- Indices de la tabla `arribo`
--
ALTER TABLE `arribo`
  ADD PRIMARY KEY (`ID_arribo`),
  ADD KEY `ID_buque` (`ID_buque`),
  ADD KEY `ID_puerto` (`ID_puerto`),
  ADD KEY `ID_agencia` (`ID_agencia`);

--
-- Indices de la tabla `buque`
--
ALTER TABLE `buque`
  ADD PRIMARY KEY (`ID_buque`);

--
-- Indices de la tabla `estudio`
--
ALTER TABLE `estudio`
  ADD PRIMARY KEY (`ID_estudio`),
  ADD KEY `ID_arribo` (`ID_arribo`),
  ADD KEY `ID_usuario` (`ID_usuario`);

--
-- Indices de la tabla `puerto`
--
ALTER TABLE `puerto`
  ADD PRIMARY KEY (`ID_puerto`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agencia`
--
ALTER TABLE `agencia`
  MODIFY `ID_agencia` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `arribo`
--
ALTER TABLE `arribo`
  MODIFY `ID_arribo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `buque`
--
ALTER TABLE `buque`
  MODIFY `ID_buque` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `estudio`
--
ALTER TABLE `estudio`
  MODIFY `ID_estudio` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `puerto`
--
ALTER TABLE `puerto`
  MODIFY `ID_puerto` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID_usuario` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `arribo`
--
ALTER TABLE `arribo`
  ADD CONSTRAINT `arribo_ibfk_1` FOREIGN KEY (`ID_buque`) REFERENCES `buque` (`ID_buque`),
  ADD CONSTRAINT `arribo_ibfk_2` FOREIGN KEY (`ID_puerto`) REFERENCES `puerto` (`ID_puerto`),
  ADD CONSTRAINT `arribo_ibfk_3` FOREIGN KEY (`ID_agencia`) REFERENCES `agencia` (`ID_agencia`);

--
-- Filtros para la tabla `estudio`
--
ALTER TABLE `estudio`
  ADD CONSTRAINT `estudio_ibfk_1` FOREIGN KEY (`ID_arribo`) REFERENCES `arribo` (`ID_arribo`),
  ADD CONSTRAINT `estudio_ibfk_2` FOREIGN KEY (`ID_usuario`) REFERENCES `usuario` (`ID_usuario`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
