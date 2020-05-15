export const days: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

export const features: string[] = ['prises', 'labo', 'PC'];

export const types: string[] = ['CM-Amorcage', 'CM', 'CM/TD', 'TD', 'TP', 'CC', 'CT', 'Projet'];

export const sol = 'XML/solution.xml';

export const modifiedSol = 'app/XML/modifiedsolution.xml';

export const prob = 'XML/problem.xml';

export const nameVal = 'test';

export const daysNb = '7';

export const weeksNb = '14';

export const slotsPerDaysNb = '288';

export const distriVal = '15';

export const roomVal = '1';

export const stdVal = '100';

export const timeVal = '25';

export const constraint = [
    {
        id: 'SameSart',
        param: [],
        idfr: 'Même Début',
        desc: 'Les cours choisis doivent commencer à la même heure'
    },
    {
        id: 'SameTime',
        param: [],
        idfr: 'Cours aux mêmes horaires',
        desc: 'Les cours choisis doivent se dérouler en même temps que le cours le plus long en terme d\'horaires'
    },
    {
        id: 'DifferentTime',
        param: [],
        idfr: 'Cours aux horaires différent',
        desc: 'Les cours choisis doivent se dérouler en même temps que le cours le plus long en terme d\'horaires'
    },
    {
        id: 'SameDays',
        param: [],
        idfr: 'Même jour',
        desc: 'Les cours choisis doivent se dérouler le même jour'
    },
    {
        id: 'DifferentDays',
        param: [],
        idfr: 'Jour différent',
        desc: 'Les cours choisis ne doivent pas se dérouler le même jour'
    },
    {
        id: 'SameWeeks',
        param: [],
        idfr: 'Même semaine',
        desc: 'Les cours choisis doivent se dérouler la même semaine'

    },
    {
        id: 'DifferentWeeks',
        param: [],
        idfr: 'Semaine différente',
        desc: 'Les cours choisis ne doivent pas se dérouler la même semaine'

    },
    {
        id: 'SameRoom',
        param: [],
        idfr: 'Même salle',
        desc: 'Les cours choisis doivent se dérouler dans la même salle'

    },
    {
        id: 'DifferentRoom',
        param: [],
        idfr: 'Salle different',
        desc: 'Les cours choisis ne doivent pas se dérouler dans la même salle'

    },
    {
        id: 'Overlap',
        param: [],
        idfr: 'Cours superposés',
        desc: 'Les cours choisis doivent se dérouler en même temps'

    },
    {
        id: 'NotOverlap',
        param: [],
        idfr: 'Cours non superposés',
        desc: 'Les cours choisis ne doivent pas se dérouler en même temps'

    },
    {
        id: 'Precedence',
        param: [],
        idfr: 'Ordre des cours',
        desc: 'Les cours choisis doivent se dérouler dans l\'ordre défini en déplaçant les cours'

    },
    {
        id: 'WorkDay',
        param: ['S'],
        idfr: 'Jour de cours',
        desc: 'Les cours choisis doivent se dérouler dans une intervalle de S minutes dans une journée'

    },
    {
        id: 'MinGap',
        param: ['G'],
        idfr: 'Temps entre deux cours',
        desc: 'Il doit y avoir un minimum de G minutes entre les 2 cours'

    },
    {
        id: 'MaxDays',
        param: ['D'],
        idfr: 'Nombre max de jour par semaine',
        desc: 'Le total des cours ne doit pas dépasser D par semaine'

    },
    {
        id: 'MaxDayLoad',
        param: ['S'],
        idfr: 'Charge de travail quotidienne',
        desc: 'La durée cumulée des cours choisis ne doit pas dépassés S minutes par jour'

    },
    {
        id: 'MaxBreaks',
        param: ['R', 'S'],
        idfr: 'Maximum de pause',
        desc: 'Il doit y avoir au plus R pauses de plus de S minutes entre les cours choisis'

    },
    {
        id: 'MaxBlock',
        param: ['M', 'S'],
        idfr: 'Maximum de cours consecutifs',
        // tslint:disable-next-line: max-line-length
        desc: 'Les cours choisis peuvent être consécutif dans la limite de M minutes. Ces blocs doivent être séparés par des pauses de S minutes maximum'

    }
];
