import MovingItem from '@/components/moving-item';
import { Instances, Hydrant } from '@/components/models/hydrant';
import { BinInstances, Bin } from '@/components/models/bin';
import { MailboxInstances, Mailbox } from '@/components/models/mailbox';
import { ElectricBoxInstances, ElectricBox } from '@/components/models/box';

const Colliders = ({ acceleration, obstacles }) => {
  return obstacles.length && (
    <Instances>
      <BinInstances>
        <MailboxInstances>
          <ElectricBoxInstances>
            {obstacles.map(({ positionZ, type }, index) => (
              <MovingItem
                key={index}
                position={[0, 0.5, positionZ]}
                offset={(obstacles[obstacles.length - 1].positionZ / 2) + 1}
                acceleration={acceleration}
              >
                {type === 0 && (
                  <Hydrant scale={0.3} position={[0, -0.5, 0]} />
                )}
                {type === 1 && (
                  <Bin scale={0.0065} position={[0, -0.5, 0]} />
                )}
                {type === 2 && (
                  <Mailbox
                    scale={[0.6, 0.4, 0.4]}
                    position={[0, -0.6, 0]}
                    rotation-y={Math.PI / 2}
                  />
                )}
                {type === 3 && (
                  <ElectricBox
                    scale={0.082}
                    position={[0, -0.6, 0]}
                    rotation-y={-Math.PI / 2}
                  />
                )}
              </MovingItem>
            ))}
          </ElectricBoxInstances>
        </MailboxInstances>
      </BinInstances>
    </Instances>
  );
};

export default Colliders;
