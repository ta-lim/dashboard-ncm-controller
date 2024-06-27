import { format } from "morgan";

class KPIValidator {
  createDataScheme = {
    type: "array",
    items: {
      type: "object",
      properties: {
        dateTrx: {
          type: "string",
          pattern: "^\\d{4}-\\d{2}$",
        },
        itemTrx: {
          type: "string",
          minLength: 1,
          maxLength: 15,
          pattern: "^[0-9]+$",
          nullable: false,
        },
        itemTrxSLA: {
          type: "string",
          minLength: 1,
          maxLength: 15,
          pattern: "^[0-9]+$",
          nullable: false,
        },
        categoryJaringan: {
          type: "number",
          enum: [1, 2, 3, 4, 5, 6, 7],
          nullable: false,
        },
      },
    },
    required: ["dateTrx", "itemTrx", "itemTrxSLA", "categoryJaringan"],
    additionalProperties: false,
  };

  createDataPaguKasScheme = {
    type: "object",
    properties: {
      dateTrx: {
        type: "string",
        pattern: "^\\d{4}-\\d{2}-\\d{2}$",
      },
      realisasi: {
        type: "string",
        pattern: "^[0-9]+$",
        minLength: 7,
        nullable: false,
      },
      paguKas: {
        type: "string",
        pattern: "^[0-9]+$",
        minLength: 7,
        nullable: false,
      },
    },
    required: ["dateTrx", "realisasi", "paguKas"],
    additionalProperties: false,
  };

  createDataKasATMScheme = {
    type: "object",
    properties: {
      dateTrx: {
        type: "string",
        pattern: "^\\d{4}-\\d{2}-\\d{2}$",
      },
      cashRetrieval: {
        type: "string",
        pattern: "^[0-9]+$",
        minLength: 7,
        nullable: false,
      },
      cashFilling: {
        type: "string",
        pattern: "^[0-9]+$",
        minLength: 7,
        nullable: false,
      },
    },
    required: ["dateTrx", "cashRetrieval", "cashFilling"],
    additionalProperties: false,
  };

  createDataUptimeMachineScheme = {
    type: "array",
    items: {
      type: "object",
      properties: {
        dateTrx: {
          type: "string",
          pattern: "^\\d{4}-\\d{2}-\\d{2}$",
        },
        upTimeATM: {
          type: "string",
          minLength: 3,
          maxLength: 6,
          // pattern: "^d{2,3}.d{2}$",
          nullable: false,
        },
        upTimeCRM: {
          type: "string",
          // minLength: 3,
          maxLength: 6,
          // pattern: "^d{2,3}.d{2}$",
          // nullable: false,
        },
        categoryWilayahOperasional: {
          type: "number",
          enum: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          ],
          nullable: false,
        },
      },
    },
    required: ["dateTrx", "upTimeATM", "upTimeCRM", "categoryWilayahOperasional"],
    additionalProperties: false,
  };
  
  createDataHandlingComplain = {
    type: "array",
    items: {
      type: "object",
      properties: {
        dateTrx: {
          type: "string",
          pattern: "^\\d{4}-\\d{2}$",
        },
        itemTrx: {
          type: "string",
          minLength: 1,
          maxLength: 7,
          pattern: "^[0-9]+$",
          nullable: false,
        },
        itemTrxSLA: {
          type: "string",
          minLength: 1,
          maxLength: 7,
          pattern: "^[0-9]+$",
          nullable: false,
        },
        categoryMachine: {
          type: "number",
          enum: [1, 2],
          nullable: false,
        }
      }
    },
    required: ["dateTrx", "itemTrx", "itemTrxSLA", "categoryMachine"],
    additionalProperties: false
  };
  createDataDisputeResolution = {
        type: "object",
        properties: {
          dateTrx: {
            type: "string",
            pattern: "^\\d{4}-\\d{2}-\\d{2}$",
          },
          itemTrx: {
            type: "string",
            minLength: 1,
            maxLength: 7,
            pattern: "^[0-9]+$",
            nullable: false,
          },
          itemTrxSLA: {
            type: "string",
            minLength: 1,
            maxLength: 7,
            pattern: "^[0-9]+$",
            nullable: false,
          },
      },
      required: ["dateTrx", "itemTrx", "itemTrxSLA"],
      additionalProperties: false
  };
  createDataEDCAvailibility = {

        type: "object",
        properties: {
          dateTrx: {
            type: "string",
            pattern: "^\\d{4}-\\d{2}-\\d{2}$",
          },
          totalActiveTID: {
            type: "string",
            minLength: 1,
            maxLength: 7,
            pattern: "^[0-9]+$",
            nullable: false,
          },
          totalTID: {
            type: "string",
            minLength: 1,
            maxLength: 7,
            pattern: "^[0-9]+$",
            nullable: false,
          },
      },
      required: ["dateTrx","totalActiveTID", "totalTID"],
      additionalProperties: false
  };
  createDataEDCImplementaion = {
    type: "array",
    items: {
      type: "object",
      properties: {
        dateTrx: {
          type: "string",
          pattern: "^\\d{4}-\\d{2}-\\d{2}$",
        },
        itemEdc: {
          type: "string",
          minLength: 1,
          maxLength: 6,
          pattern: "^[0-9]+$",
          nullable: false,
        },
        targetItemEdc: {
          type: "string",
          minLength: 1,
          maxLength: 6,
          pattern: "^[0-9]+$",
          nullable: false,
        },
        categoryWilayahOperasional: {
          type: "number",
          enum: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17
          ],
          nullable: false,
        },
      },
    },
    required: ["dateTrx", "itemEdc", "teargetItemEdc" ,"categoryWilayahOperasional"],
    additionalProperties: false,
  };
}

export default KPIValidator;
