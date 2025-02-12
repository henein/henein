export const NEXON_API_ERRORS = {
  OPENAPI00001: {
    status: 500,
    message: 'Internal Server Error',
    description: '서버 내부 오류',
  },
  OPENAPI00002: {
    status: 403,
    message: 'Forbidden',
    description: '권한이 없는 경우',
  },
  OPENAPI00003: {
    status: 400,
    message: 'Bad Request',
    description: '유효하지 않은 식별자',
  },
  OPENAPI00004: {
    status: 400,
    message: 'Bad Request',
    description: '파라미터 누락 또는 유효하지 않음',
  },
  OPENAPI00005: {
    status: 400,
    message: 'Bad Request',
    description: '유효하지 않은 API KEY',
  },
  OPENAPI00006: {
    status: 400,
    message: 'Bad Request',
    description: '유효하지 않은 게임 또는 API PATH',
  },
  OPENAPI00007: {
    status: 429,
    message: 'Too Many Requests',
    description: 'API 호출량 초과',
  },
  OPENAPI00009: {
    status: 400,
    message: 'Bad Request',
    description: '데이터 준비 중',
  },
  OPENAPI00010: {
    status: 400,
    message: 'Bad Request',
    description: '게임 점검 중',
  },
  OPENAPI00011: {
    status: 503,
    message: 'Service Unavailable',
    description: 'API 점검 중',
  },
};
