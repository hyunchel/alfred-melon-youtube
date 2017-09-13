const alfy = require('alfy');

const DEFAULT_CUTLINE = 50;
const CHOICES = {
    create(date, cutLine) {
        const action = 'create';
        return {
            title: 'Create this playlist',
            subtitle: `Create Top ${cutLine} Melon Weekly Chart ${date} playlist on your Youtube account.`,
            arg: JSON.stringify({
                date,
                cutLine,
                action,
            }),
        };
    },
    delete(date, cutLine) {
        const action = 'delete';
        return {
            title: 'Delete this playlist',
            subtitle: `Delete Top ${cutLine} Melon Weekly Chart ${date} playlist from your Youtube account.`,
            arg: JSON.stringify({
                date,
                cutLine,
                action,
            }),
        };
    },
};

let [date, cutLine] = alfy.input.split(' ');
if (isNaN(parseInt(cutLine))) {
    cutLine = DEFAULT_CUTLINE;
}
const items = [CHOICES.create(date, cutLine), CHOICES.delete(date, cutLine)];
alfy.output(items);