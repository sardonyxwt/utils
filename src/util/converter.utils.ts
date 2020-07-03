export abstract class Converter<IN, OUT> {
    abstract convert(source: IN): OUT;

    convertArray(sources: IN[]): OUT[] {
        return sources.map(this.convert);
    }
}

export abstract class DoubleSidedConverter<IN, OUT> extends Converter<IN, OUT> {
    abstract revert(source: OUT): IN;

    revertArray(sources: OUT[]): IN[] {
        return sources.map(this.revert);
    }
}

export abstract class StraightConverter<IN, INTERMEDIATE, OUT = IN> {
    abstract convertTo(source: IN): INTERMEDIATE;
    abstract convertFrom(source: INTERMEDIATE): OUT;

    convertToArray(sources: IN[]): INTERMEDIATE[] {
        return sources.map(this.convertTo);
    }

    convertFromArray(sources: INTERMEDIATE[]): OUT[] {
        return sources.map(this.convertFrom);
    }
}
