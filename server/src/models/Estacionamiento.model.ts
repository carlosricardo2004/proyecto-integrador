import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "estacionamiento",
    timestamps: true,
    underscored: true,
})
class Estacionamiento extends Model {
    @Column({
        type: DataType.ENUM("estacionamiento", "autolavado", "cambio_de_aceite"),
        allowNull: false,
    })
    tipoDeServicio: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    automovil: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    precio: number;
}

export default Estacionamiento;