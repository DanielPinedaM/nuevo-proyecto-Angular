/*
# Interceptor HTTP:
normaliza el error a IResponse<T>,
loguea con HttpLogService,
delega el manejo global}

REGLA OBLIGAGTORIA:
el error se "traga", NUNCA propagar el error, usar (of(...))

*/