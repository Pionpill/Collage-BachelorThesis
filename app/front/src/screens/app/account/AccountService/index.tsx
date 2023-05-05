import { Stack } from "@mui/material";
import RelationLink from "./RelationLink";
import ServiceList from "./ServiceList";

const AccountService: React.FC = () => {
  return (
    <Stack overflow="auto" gap={2} height="100%">
      <RelationLink />
      <ServiceList />
    </Stack>
  );
};

export default AccountService;
