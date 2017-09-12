import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AllowNull,
	Length,
	DataType,
	Unique,
} from 'sequelize-typescript';

@Table
class Group extends Model<Group> {

	@PrimaryKey
	@Column(DataType.INTEGER(2))
	id: number;

	@Unique
	@AllowNull(false)
	@Length({ max: 20 })
	@Column(DataType.STRING(20))
	descriptor: string;
}

export default Group;
