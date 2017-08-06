'eliminación'
'actualización'



INSERT INTO citasmovimientos(id_rol, descripcion, fechaMovimiento, tipoMovimiento) 
	VALUES (old.id_rol, old.descripcion, now(), 'eliminación');