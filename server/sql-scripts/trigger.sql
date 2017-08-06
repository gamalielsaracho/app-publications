-- DELETE.

INSERT INTO citasmovimientos(id_citaMovimiento, id_citas, fecha, hora, id_pacientes, id_especialidades, fechaMovimiento, tipoMovimiento) 
	VALUES (old.id_citas, old.fecha, old.hora, old.id_pacientes, old.id_especialidades, now(), 'eliminación')


-- UPDATE.
INSERT INTO citasmovimientos(id_citaMovimiento, id_citas, fecha, hora, id_pacientes, id_especialidades, fechaMovimiento, tipoMovimiento) 
	VALUES (new.id_citas, new.fecha, new.hora, new.id_pacientes, new.id_especialidades, now(), 'actualización')

