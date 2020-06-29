export declare abstract class Converter<IN, OUT> {
    abstract convert(source: IN): OUT;
    convertArray(sources: IN[]): OUT[];
}
export declare abstract class DoubleSidedConverter<IN, OUT> extends Converter<IN, OUT> {
    abstract revert(source: OUT): IN;
    revertArray(sources: OUT[]): IN[];
}
export declare abstract class StraightConverter<IN, INTERMEDIATE, OUT = IN> {
    abstract convertTo(source: IN): INTERMEDIATE;
    abstract convertFrom(source: INTERMEDIATE): OUT;
    convertToArray(sources: IN[]): INTERMEDIATE[];
    convertFromArray(sources: INTERMEDIATE[]): OUT[];
}
