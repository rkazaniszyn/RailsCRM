import _ from 'lodash';

export default function validateRecord(record, metadata) {
    let errors = [];
    for (let i = 0; i < metadata.length; i++) {
        if (metadata[i].required && _.isEmpty(record[metadata[i].field])) {
            errors.push({field: metadata[i].field, error: 'This field is required.'})
        }
    }
    return errors;
}