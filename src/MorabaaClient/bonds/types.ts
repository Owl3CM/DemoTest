export interface IBondsParams {
    currencyId?: string;
    bondType?: string;
    businessId: string;
    query?: string;
}

export interface IAddBondBody {}

export interface IAddBond {
    body: IAddBondBody;
    clearCash?: boolean;
    params?: any;
}

export interface ILoadBondsProps {
    id: string;
    clearCash?: boolean;
}
